package pl.sekowski.rent.water.equipment.item;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.sekowski.rent.water.equipment.item.category.ItemCategory;
import pl.sekowski.rent.water.equipment.item.category.ItemCategoryWrapper;
import pl.sekowski.rent.water.equipment.item.permission.ItemPermissionWrapper;
import pl.sekowski.rent.water.equipment.rental.ItemLeased;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "item_name")
    private String name;
    @ManyToMany
    @JoinTable(
            name = "item_category_cross",
            joinColumns = {@JoinColumn(name = "id_item", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "item_category", referencedColumnName = "id")
            }
    )
    private Set<ItemCategoryWrapper> itemCategorySet;
    @OneToMany(mappedBy = "item")
    Set<ItemLeased> itemLeasedSet;
    private String description;
    @Column(name = "price_per_unit")
    private Double pricePerUnit;
    @Enumerated(EnumType.STRING)
    private Unit unit;
    private Boolean available;
    @ManyToMany
    @JoinTable(
            name = "item_permission_cross",
            joinColumns = {@JoinColumn(name = "id_item", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "item_permission", referencedColumnName = "id")}
    )
    private Set<ItemPermissionWrapper> itemPermissionWrappers;


    public Item(String name, String description, Double pricePerUnit, Unit unit, Boolean available) {
        this.name = name;
        this.description = description;
        this.pricePerUnit = pricePerUnit;
        this.unit = unit;
        this.available = available;
        itemCategorySet = new HashSet<>();
        itemLeasedSet = new HashSet<>();
    }

    public Item(String name, String description, Double pricePerUnit, Unit unit, Boolean available, ItemCategoryWrapper idCategory) {
        this.name = name;
        this.description = description;
        this.pricePerUnit = pricePerUnit;
        this.unit = unit;
        this.available = available;
        itemCategorySet = new HashSet<>();
        itemCategorySet.add(idCategory);
        itemLeasedSet = new HashSet<>();
    }


    public boolean isItemCorrect() {
        if (name.length() < 1)
            return false;
        if (description.length() < 1)
            return false;
        return pricePerUnit > 0;
    }
}
