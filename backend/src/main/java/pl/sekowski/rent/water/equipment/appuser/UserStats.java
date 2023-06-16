package pl.sekowski.rent.water.equipment.appuser;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserStats {

    private String lastName;
    private Double totalCost;
    private Integer rentalsNumber;
}
