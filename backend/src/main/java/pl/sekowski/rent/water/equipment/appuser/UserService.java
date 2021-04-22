package pl.sekowski.rent.water.equipment.appuser;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final String USER_NOT_FOUND_MSG = "user with email %s not found";
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    public List<User> getAllUser(){
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


    //TODO: make return UUID
    public String signUser(User user){
        boolean userExist = userRepository
                .findByEmail(user.getEmail())
                .isPresent();
        if ( userExist ){
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
