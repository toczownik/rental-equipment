package pl.sekowski.rent.water.equipment.rental;

import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.sekowski.rent.water.equipment.appuser.User;
import pl.sekowski.rent.water.equipment.appuser.UserRepository;
import pl.sekowski.rent.water.equipment.item.Item;
import pl.sekowski.rent.water.equipment.item.ItemRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ItemLeasedService {

    private final ItemLeasedRepository itemLeasedRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    @Transactional
    public void addNewLeased(Long userId, Long itemId, LocalDateTime timeFrom, LocalDateTime timeTo) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty())
            throw new UsernameNotFoundException("user not found");
        Optional<Item> itemOptional = itemRepository.findById(itemId);
        if (itemOptional.isEmpty())
            throw new IllegalArgumentException("item not found");
        User user = userOptional.get();
        Item item = itemOptional.get();
        ItemLeased itemLeased = new ItemLeased(user, item, timeFrom, timeTo);

        itemLeasedRepository.save(itemLeased);
        item.getItemLeasedSet().add(itemLeased);
        user.getItemLeasedSet().add(itemLeased);
        itemRepository.save(item);
        userRepository.save(user);

    }

    @Transactional
    public void deleteLeased(Long idLeased) {
        Optional<ItemLeased> itemLeasedOptional = itemLeasedRepository.findById(idLeased);
        if (itemLeasedOptional.isEmpty())
            throw new IllegalArgumentException("Leased not exist");
        itemLeasedRepository.delete(itemLeasedOptional.get());

    }

    //todo to delete
    public void addNewLeased(User user, Item item, LocalDateTime timeFrom, LocalDateTime timeTo) {
        ItemLeased itemLeased = new ItemLeased(
                user,
                item,
                timeFrom,
                timeTo
        );
        itemLeasedRepository.save(itemLeased);
    }

}
