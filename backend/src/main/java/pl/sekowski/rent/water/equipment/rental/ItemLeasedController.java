package pl.sekowski.rent.water.equipment.rental;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.sekowski.rent.water.equipment.item.Item;

import java.util.Collection;

@RestController
@RequestMapping(path = "api/v1/rent")
public class ItemLeasedController {

    private final ItemLeasedService itemLeasedService;

    @Autowired
    public ItemLeasedController(ItemLeasedService itemLeasedService) {
        this.itemLeasedService = itemLeasedService;
    }

    //TODO add security Ensure a particular user can only see their own user details or admin
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public void makeLeased(@RequestBody LeasedRequest leasedRequest) {
        itemLeasedService.addNewLeased(
                leasedRequest.getUserId(),
                leasedRequest.getItemId(),
                leasedRequest.getTimeFrom(),
                leasedRequest.getTimeTo()
        );
    }

    @GetMapping
    public Page<ItemLeased> itemsPageable(Pageable pageable){
        return itemLeasedService.getPageOfLeased(pageable);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public void deleteLeased(@PathVariable  Long id) {
        System.out.println("weszlo");//todo
//        return null;

        itemLeasedService.deleteLeased(id);
    }

    @GetMapping("/{idItem}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public Collection<ItemLeased> getAllLeasedByItemId(@PathVariable Long idItem) {
        return itemLeasedService.getAllLeasedByItemId(idItem);
    }
}