package pl.sekowski.rent.water.equipment.item.category;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor // todo
public class ItemCategoryService {

    private final ItemCategoryRepository itemCategoryRepository;

    public List<ItemCategoryWrapper> getAllTypesOfItemCategory(){
        return itemCategoryRepository.findAll();
    }
}
