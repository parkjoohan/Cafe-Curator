package com.kql.caffein.entity.User;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.kql.caffein.converter.CategoryDataConverter;
import lombok.*;

import javax.persistence.*;
import java.util.List;

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

    @Convert(converter = CategoryDataConverter.class)
    @Column(name = "category_list", columnDefinition = "json")
    private List<String> categoryList;

    @Column(name = "follower_count")
    private int followerCount;

    @Column(name = "following_count")
    private int followingCount;
}
