package pl.sekowski.rent.water.equipment.item.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/categories")
public class ItemCategoryController {

    private final ItemCategoryService itemCategoryService;

    @Autowired
    public ItemCategoryController(ItemCategoryService categoryService) {
        this.itemCategoryService = categoryService;
    }

    @GetMapping
    public List<ItemCategoryWrapper> getCategories(){
        return itemCategoryService.getAllTypesOfItemCategory();
    }
}
