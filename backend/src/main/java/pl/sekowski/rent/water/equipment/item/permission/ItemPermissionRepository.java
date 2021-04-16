package pl.sekowski.rent.water.equipment.item.permission;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemPermissionRepository extends JpaRepository<ItemPermissionWrapper, Long> {
}
