package pl.sekowski.rent.water.equipment.registration.email;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.sekowski.rent.water.equipment.appuser.UserService;


@Service
@AllArgsConstructor
public class EmailService {

    private final EmailValidator emailValidator;
    private final UserService userService;

    //TODO: make confirm email and set mup enable account

}
