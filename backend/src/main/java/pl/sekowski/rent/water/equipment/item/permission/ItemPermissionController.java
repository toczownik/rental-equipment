package pl.sekowski.rent.water.equipment.item.permission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/permissions")
public class ItemPermissionController {

    private final ItemPermissionService itemPermissionService;

    @Autowired
    public ItemPermissionController(ItemPermissionService itemPermissionService) {
        this.itemPermissionService = itemPermissionService;
    }

    @GetMapping
    public List<ItemPermissionWrapper> getPermissions(){
        return itemPermissionService.getAllTypesOfItemPermission();
    }
}
