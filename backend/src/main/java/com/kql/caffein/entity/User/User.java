package com.kql.caffein.entity.User;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.kql.caffein.dto.Role;
import com.kql.caffein.entity.EmailAuth;
import lombok.*;

import javax.persistence.*;
import java.util.Date;


@Getter
@Setter
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

    @OneToOne(fetch = FetchType.LAZY)
    @JsonManagedReference
    @JoinColumn(name = "email")
    private EmailAuth emailAuth;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "join_date")
    private Date joinDate;

    @Column(name = "oauth_type", nullable = false)
    private String oauthType;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

//    @Builder
//    public User(String userNo, String email, Date joinDate, String oauthType, Role role){
//        this.content = content;
//        this.regTime = regTime;
//        this.cafeName = cafeName;
//        this.categoryList = categoryList;
//        this.likeCount = likeCount;
//        this.commentCount = commentCount;
//        this.userNo = userNo;
//    }
}
