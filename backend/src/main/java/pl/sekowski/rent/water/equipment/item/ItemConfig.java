package pl.sekowski.rent.water.equipment.item;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.sekowski.rent.water.equipment.appuser.User;
import pl.sekowski.rent.water.equipment.appuser.UserRole;
import pl.sekowski.rent.water.equipment.appuser.UserService;
import pl.sekowski.rent.water.equipment.csv.CsvReader;
import pl.sekowski.rent.water.equipment.item.category.ItemCategory;
import pl.sekowski.rent.water.equipment.item.category.ItemCategoryRepository;
import pl.sekowski.rent.water.equipment.item.category.ItemCategoryWrapper;
import pl.sekowski.rent.water.equipment.item.permission.ItemPermission;
import pl.sekowski.rent.water.equipment.item.permission.ItemPermissionRepository;
import pl.sekowski.rent.water.equipment.item.permission.ItemPermissionWrapper;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class ItemConfig {

    @Bean
    CommandLineRunner commandLineRunner(
            ItemRepository itemRepository,
            ItemCategoryRepository itemCategoryRepository,
            ItemPermissionRepository itemPermissionRepository,
            UserService userService
    ) {
        return args -> {
            List<ItemCategoryWrapper> categoryWrapperList = new ArrayList<>();
            for (ItemCategory type : ItemCategory.values()) {
                categoryWrapperList.add(new ItemCategoryWrapper(type));
            }
            itemCategoryRepository.saveAll(categoryWrapperList);

            List<Item> items = CsvReader.readItem("src/main/resources/csv.data/items.csv", categoryWrapperList);
            items.forEach(itemRepository::save);


            List<ItemPermissionWrapper> itemPermissionWrappers = new ArrayList<>();
            for (ItemPermission permission : ItemPermission.values()) {
                itemPermissionWrappers.add(new ItemPermissionWrapper(permission));
            }
            itemPermissionRepository.saveAll(itemPermissionWrappers);

            List<User> users = CsvReader.readUser("src/main/resources/csv.data/users.csv");
            users.forEach(userService::signUser);


            User userAdmin = new User("adminName", "adminSurname", "admin", "admin", UserRole.ROLE_ADMIN);
            userService.signUser(userAdmin);
        };
    }
}
