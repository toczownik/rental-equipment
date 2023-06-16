package pl.sekowski.rent.water.equipment.appuser;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final String USER_NOT_FOUND_MSG = "user with email %s not found";
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;



    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return userRepository
                .findByEmail(s)
                .orElseThrow(
                        () -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, s))
                );
    }

    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    public User getUserByMail(String mail) {
        Optional<User> user = userRepository.findByEmail(mail);
        return user.orElse(null);
    }

    public void updateUser(UpdateUserRequest user) {
        //todo add log library
        System.out.println("to dostałem jako user plik userService " + user);
        Optional<User> userDb = userRepository.findById(user.getId());
        if ( userDb.isPresent() ){
            User updateUser = userDb.get();
            if ( !user.getEmail().equals("") ){
                updateUser.setEmail(user.getEmail());
            }
            if ( !user.getFirstName().equals("") ){
                updateUser.setFirstName(user.getFirstName());
            }
            if ( !user.getLastName().equals("") )
                updateUser.setLastName(user.getLastName());
            userRepository.save(updateUser);
        }

    }

    public void updateUserWithRole(UpdateUserWithRole user){
        Optional<User> userDb = userRepository.findById(user.getId());

        if ( userDb.isPresent() ){
            User updateUser = userDb.get();
            if ( !user.getEmail().equals("") ){
                updateUser.setEmail(user.getEmail());
            }
            if ( !user.getFirstName().equals("") ){
                updateUser.setFirstName(user.getFirstName());
            }
            if ( !user.getLastName().equals("") )
                updateUser.setLastName(user.getLastName());
            System.out.println("rola usera " + user.getUserRole());
            updateUser.setUserRole(user.getUserRole());
            //todo check is user role is correct
            userRepository.save(updateUser);
        }
    }

    public void updatePassword(UpdatePassword updatePassword){
        Optional<User> userDb = userRepository.findById(updatePassword.getUserId());
        if ( userDb.isPresent() ){
            if ( !updatePassword.getPassword().equals("") ){
                String encodePassword = bCryptPasswordEncoder.encode(updatePassword.getPassword());
                userDb.get().setPassword(encodePassword);
                userRepository.save(userDb.get());
            }else{
                throw new IllegalStateException("password can't be empty");
            }
        }else {
            throw new IllegalStateException("user not exist");
        }
    }

    //TODO: make return UUID
    public String signUser(User user) {
        boolean userExist = userRepository
                .findByEmail(user.getEmail())
                .isPresent();
        if (userExist) {
            // TODO check of attributes are the same and
            // TODO if email not confirmed send confirmation email.
            String EMAIL_IS_ALREADY_EXIT = "email %s is already taken";
            throw new IllegalStateException(String.format(EMAIL_IS_ALREADY_EXIT, user.getEmail()));
        }
        String encodePassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodePassword);
        userRepository.save(user);

        return null;
    }
}
