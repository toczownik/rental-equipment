package pl.sekowski.rent.water.equipment.rental;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.sekowski.rent.water.equipment.appuser.User;
import pl.sekowski.rent.water.equipment.item.Item;
import pl.sekowski.rent.water.equipment.item.Unit;

import javax.persistence.*;
import java.time.Duration;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class ItemLeased {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User user;
    @ManyToOne
    private Item item;
    @Column(name = "price_per_unit")
    private Double pricePerUnit;
    @Column(name = "time_from", columnDefinition = "TIMESTAMP")
    private LocalDateTime timeFrom;
    @Column(name = "time_to", columnDefinition = "TIMESTAMP")
    private LocalDateTime timeTo;
    @Enumerated(EnumType.STRING)
    private Unit unit;
    private Double discount;
    @Column(name = "total_price")
    private Double totalPrice;


    public ItemLeased(User user, Item item, LocalDateTime timeFrom, LocalDateTime timeTo) {
        this.user = user;
        this.item = item;
        this.timeFrom = timeFrom;
        this.timeTo = timeTo;
        unit = item.getUnit();
        pricePerUnit = item.getPricePerUnit();
        discount = 0.0;
        calculateTotalPrice(item, timeFrom, timeTo, discount);
    }

    private void calculateTotalPrice(Item item, LocalDateTime timeFrom, LocalDateTime timeTo, Double discount) {
        if (item.getUnit() == Unit.DAY)
            totalPrice = Duration.between(timeFrom, timeTo).toDays() * pricePerUnit - discount;
        else if (item.getUnit() == Unit.HOUR)
            totalPrice = Duration.between(timeFrom, timeTo).toHours() * pricePerUnit - discount;
    }

    public ItemLeased(User user, Item item, LocalDateTime timeFrom, LocalDateTime timeTo, Double discount) {
        this.user = user;
        this.item = item;
        this.timeFrom = timeFrom;
        this.timeTo = timeTo;
        this.discount = discount;
        calculateTotalPrice(item, timeFrom, timeTo, discount);
    }
}
