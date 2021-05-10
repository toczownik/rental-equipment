package pl.sekowski.rent.water.equipment.appuser;

import lombok.*;

@Getter
@Setter
@EqualsAndHashCode
public class UpdateUserWithRole extends UpdateUserRequest{

    private UserRole userRole;

    public UpdateUserWithRole() {
    }

    public UpdateUserWithRole(Long id, String firstName, String lastName, String email, UserRole userRole) {
        super(id, firstName, lastName, email);
        this.userRole = userRole;
    }

    public UpdateUserWithRole(Long id, String firstName, String lastName, String email) {
        super(id, firstName, lastName, email);
    }
}
