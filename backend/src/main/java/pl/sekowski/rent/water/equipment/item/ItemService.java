package pl.sekowski.rent.water.equipment.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.sekowski.rent.water.equipment.item.category.ItemCategoryWrapper;
import pl.sekowski.rent.water.equipment.item.permission.ItemPermissionWrapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Item getItemById(Long id){
        Optional<Item> item = itemRepository.findById(id);
        return item.orElse(null);
    }

    public List<Item> getItemsByCategories(Set<ItemCategoryWrapper> itemCategoryWrappers) {
        List<Item> allItems = itemRepository.findAll();
        allItems = allItems.stream().filter(item -> item.getItemCategorySet().containsAll(itemCategoryWrappers)).collect(Collectors.toList());
        return allItems;
    }

    public List<Item> getItemWithPermission(List<Item> items, Set<ItemPermissionWrapper> userPermission) {
        List<Item> listItem = new ArrayList<>();
        for (Item item : items) {
            if (userPermission.containsAll(item.getItemPermissionWrappers()))
                listItem.add(item);
        }
        return listItem;
    }

    public List<Item> getItemByName(List<Item> items, String nameOfItem ){
        items = items.stream().filter(item -> item.getName().contains(nameOfItem)).collect(Collectors.toList());
        return items;
    }

    public List<Item> getFilteredItems(ItemFilter itemFilter) {
        List<Item> items = getItemsByCategories(itemFilter.getCategoryWrapperSet());
        items = getItemWithPermission(items, itemFilter.getItemPermissionWrapperSet());
        return getItemByName(items, itemFilter.getName());
    }

    public void saveItem(Item item) {
        itemRepository.save(item);
    }

    @Transactional
    public void updateItem(Item itemToUpdate) {
        if (itemToUpdate.getId() == null)
            throw new IllegalStateException("item's id is null");
        itemRepository.findById(itemToUpdate.getId())
                .orElseThrow(() -> new IllegalStateException("item with id" + itemToUpdate.getId() + " do not exist"));
        if (!itemToUpdate.isItemCorrect())
            throw new IllegalArgumentException("item sent to update is no valid");
        itemRepository.save(itemToUpdate);
    }

    public void deleteItem(Long id){
        itemRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("item with id" + id + " do not exist"));
        itemRepository.deleteById(id);
    }

    public long getNumberOfProducts(){
        return itemRepository.count();
    }
}
