package pl.sekowski.rent.water.equipment.appuser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.sekowski.rent.water.equipment.item.Item;
import pl.sekowski.rent.water.equipment.registration.RegistrationRequest;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(path = "api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {
        return userService.getAllUser();
    }

    //TODO add security Ensure a particular user can only see their own user details
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/by-email/{mail}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public User getUserByMail(@PathVariable String mail) {
        return userService.getUserByMail(mail);
    }

    @PutMapping()
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public void getUserById(@RequestBody UpdateUserRequest userRequest) {
        userService.updateUser(userRequest);
    }


    @PostMapping("/register")
    public void registerUser(@RequestBody User user){
        User u1 = new User(user.getFirstName(), user.getLastName(), user.getEmail(), user.getPassword());

        userService.signUser(u1);
    }
}
