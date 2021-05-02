package pl.sekowski.rent.water.equipment.rental;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
public class LeasedRequest {

    private Long userId;
    private Long itemId;
    private LocalDateTime timeFrom;
    private LocalDateTime timeTo;
}
