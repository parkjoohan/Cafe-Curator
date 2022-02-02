package com.kql.caffein.repository;

import com.kql.caffein.entity.Feed.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Integer> {

}
