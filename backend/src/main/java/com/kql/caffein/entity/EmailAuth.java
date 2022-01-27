package com.kql.caffein.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.kql.caffein.entity.User.User;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
public class EmailAuth {
    @Id
    @JsonBackReference
    private String email;

    @Column(length = 6)
    private String code;

    @Column
    private boolean state;
}
