package pl.sekowski.rent.water.equipment.rental;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface ItemLeasedRepository extends JpaRepository<ItemLeased, Long> {

    Collection<ItemLeased> getAllByItemId(Long id);
}
