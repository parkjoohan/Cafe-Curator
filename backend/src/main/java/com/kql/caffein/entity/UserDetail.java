package com.kql.caffein.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
public class UserDetail {
    @Id
    private String userNo;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonManagedReference
    @JoinColumn(name = "user_no")
    private User user;

    @Column(nullable = false)
    private String userId;

    @Column
    private String pass;

    @Column
    private String introduction;

    @Column
    private String picture;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "category_list")
    private String categoryList;

}

