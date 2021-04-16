package pl.sekowski.rent.water.equipment.rental;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/rent")
@AllArgsConstructor
public class ItemLeasedController {

    private final ItemLeasedService itemLeasedService;

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
}