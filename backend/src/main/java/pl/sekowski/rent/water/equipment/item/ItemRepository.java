package pl.sekowski.rent.water.equipment.item;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    long count();

    @Query(value = "SELECT * FROM item "
            + "inner join item_category_cross on item.id = item_category_cross.id_item "
            + "where item.item_name like %:name% "
            + "and"
            + " item_category_cross.item_category = :category ",
            nativeQuery = true)
    Page<Item> filterItemsByNameAndCategory(@Param("name") String name, @Param("category") Long id, Pageable pageable);
}
