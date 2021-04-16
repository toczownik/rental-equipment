package pl.sekowski.rent.water.equipment.rental;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemLeasedRepository extends JpaRepository<ItemLeased, Long> {
}
