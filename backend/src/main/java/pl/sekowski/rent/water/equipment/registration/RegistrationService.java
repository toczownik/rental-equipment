package pl.sekowski.rent.water.equipment.registration;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.sekowski.rent.water.equipment.appuser.User;
import pl.sekowski.rent.water.equipment.appuser.UserService;
import pl.sekowski.rent.water.equipment.registration.email.EmailValidator;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final EmailValidator emailValidator;
    private final UserService userService;

    public void register(RegistrationRequest request){
        boolean isEmailValid = emailValidator.test(request.getEmail());
        if ( !isEmailValid )
            throw new IllegalArgumentException("Email not valid");
        String token = userService.signUser(
                new User(
                        request.getFirsName(),
                        request.getLastName(),
                        request.getEmail(),
                        request.getPassword()
                )
        );
    }
}
