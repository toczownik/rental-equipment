package pl.sekowski.rent.water.equipment.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import pl.sekowski.rent.water.equipment.item.category.ItemCategoryWrapper;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(path = "api/items")
public class ItemController {

    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public List<Item> getItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/{id}")
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

    @GetMapping("/count")
    public long getNumberOfAllRecords(){
        return itemService.getNumberOfProducts();
    }

    @GetMapping("/listPageable")
    public Page<Item> itemsPageable(Pageable pageable){
        return itemService.getPageOfItem(pageable);
    }
}
