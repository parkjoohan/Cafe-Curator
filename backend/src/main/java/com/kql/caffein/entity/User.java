package com.kql.caffein.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.kql.caffein.dto.Role;
import lombok.*;

import javax.persistence.*;
import java.util.Date;


@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
public class User {
    @Id
    @Column(name = "user_no", nullable = false, length = 13)
    private String userNo;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonBackReference
    private UserDetail userDetail;

    @Column(nullable = false)
    private String email;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "join_date")
    private Date joinDate;

    @Column(name = "oauth_type", nullable = false)
    private String oauthType;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;
}
