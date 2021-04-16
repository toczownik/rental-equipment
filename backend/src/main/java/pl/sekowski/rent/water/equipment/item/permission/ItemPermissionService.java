package pl.sekowski.rent.water.equipment.item.permission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemPermissionService {

    private final ItemPermissionRepository itemPermissionRepository;

    @Autowired
    public ItemPermissionService(ItemPermissionRepository itemPermissionRepository) {
        this.itemPermissionRepository = itemPermissionRepository;
    }
    public List<ItemPermissionWrapper> getAllTypesOfItemPermission(){
        return itemPermissionRepository.findAll();
    }
}
