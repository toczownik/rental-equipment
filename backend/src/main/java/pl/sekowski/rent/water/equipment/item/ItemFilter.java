package pl.sekowski.rent.water.equipment.item;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.sekowski.rent.water.equipment.item.category.ItemCategoryWrapper;
import pl.sekowski.rent.water.equipment.item.permission.ItemPermissionWrapper;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemFilter {
    private String name;
    private Set<ItemCategoryWrapper> categoryWrapperSet;
    private Set<ItemPermissionWrapper> itemPermissionWrapperSet;
}

/* structure in JSON
{
    "categoryWrapperSet": [
        {
            "id": 2,
            "itemTypes": "GLASS"
        },
        {
            "id": 1,
            "itemTypes": "BALL"
        }
    ],
        "itemPermissionWrapperSet": [
        {
            "id": 1,
            "itemPermission": "EIGHTEEN"
        },
        {
            "id": 2,
            "itemPermission": "PATENT"
        }
    ]
}
*/