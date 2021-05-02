package pl.sekowski.rent.water.equipment.rental;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping(path = "api/v1/rent")
@AllArgsConstructor
public class ItemLeasedController {

    private final ItemLeasedService itemLeasedService;

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

    @DeleteMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public void DeleteLeased(@RequestBody Long id) {
        itemLeasedService.deleteLeased(id);
    }

    @GetMapping("/{idItem}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public Collection<ItemLeased> getAllLeasedByItemId(@PathVariable Long idItem) {
        return itemLeasedService.getAllLeasedByItemId(idItem);
    }
}