package pl.sekowski.rent.water.equipment.registration.email;

import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.function.Predicate;

@Service
public class EmailValidator implements Predicate<String> {
    @Override
    public boolean test(String s) {
        //TODO: make some regex to valid email
        return true;
    }
}
