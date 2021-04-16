package pl.sekowski.rent.water.equipment.item.permission;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "item_permission")
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class ItemPermissionWrapper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Enumerated(EnumType.STRING)
    private ItemPermission itemPermission;

    public ItemPermissionWrapper(ItemPermission itemPermission) {
        this.itemPermission = itemPermission;
    }
}
