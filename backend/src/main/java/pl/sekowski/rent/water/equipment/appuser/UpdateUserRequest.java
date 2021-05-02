package pl.sekowski.rent.water.equipment.appuser;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
//@ToString
public class UpdateUserRequest {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
}
