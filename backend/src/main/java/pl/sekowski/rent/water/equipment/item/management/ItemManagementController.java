package pl.sekowski.rent.water.equipment.item.management;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.sekowski.rent.water.equipment.item.Item;
import pl.sekowski.rent.water.equipment.item.ItemService;

@RestController
@RequestMapping(path = "api/management/item")
public class ItemManagementController {

    private final ItemService itemService;

    @Autowired
    public ItemManagementController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public void addItem(@RequestBody Item item) {
        item.setId(null);
        itemService.saveItem(item);
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public void updateItem(@RequestBody Item item) {
        itemService.updateItem(item);
    }

    @DeleteMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteStudent(@RequestParam Long studentId) {
        itemService.deleteItem(studentId);
    }
}
