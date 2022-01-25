package com.kql.caffein.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FollowId implements Serializable {
    private String userNo;
    private String getUserNo;
}
