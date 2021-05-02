package pl.sekowski.rent.water.equipment.rental;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.sekowski.rent.water.equipment.appuser.User;
import pl.sekowski.rent.water.equipment.item.Item;
import pl.sekowski.rent.water.equipment.item.Unit;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Entity
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@JsonIgnoreProperties({ "user", "item" })
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
        Instant instantStart = timeFrom.atZone(ZoneId.systemDefault()).toInstant();
        long timeInMillisStart = instantStart.toEpochMilli();
        Instant instantEnd = timeTo.atZone(ZoneId.systemDefault()).toInstant();
        long timeInMillisEnd = instantEnd.toEpochMilli();
        double diff = timeInMillisEnd - timeInMillisStart;
        if (item.getUnit() == Unit.DAY){
            double days = Math.ceil(diff / (1000 * 60 * 60 * 24));
            totalPrice = days * pricePerUnit - discount;
        }
        else if (item.getUnit() == Unit.HOUR){
            double days = Math.ceil(diff / (1000 * 60 * 60));
            totalPrice = days * pricePerUnit - discount;
        }
        totalPrice = Math.round(totalPrice * 100.0) / 100.0;
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
