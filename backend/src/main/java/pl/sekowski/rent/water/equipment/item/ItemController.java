package pl.sekowski.rent.water.equipment.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.sekowski.rent.water.equipment.item.category.ItemCategoryWrapper;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(path = "api/items")
@CrossOrigin(origins = "http://localhost:3000")
public class ItemController {

    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public List<Item> getItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public Item getItemsById(@PathVariable Long id) {
        return itemService.getItemById(id);
    }

    //TODO: probably useless
    @PostMapping
    public List<Item> getItemsByCategories(@RequestBody Set<ItemCategoryWrapper> categoryWrapperSet) {
        return itemService.getItemsByCategories(categoryWrapperSet);
    }

    @PostMapping("/filter")
    public List<Item> getFilteredItems(@RequestBody ItemFilter itemFilter){
        return itemService.getFilteredItems(itemFilter);
    }
}
