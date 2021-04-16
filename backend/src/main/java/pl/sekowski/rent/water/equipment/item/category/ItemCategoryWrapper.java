package pl.sekowski.rent.water.equipment.item.category;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "item_category")
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class ItemCategoryWrapper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Enumerated(EnumType.STRING)
    private ItemCategory itemTypes;


    public ItemCategoryWrapper(ItemCategory itemTypes) {
        this.itemTypes = itemTypes;
    }
}
