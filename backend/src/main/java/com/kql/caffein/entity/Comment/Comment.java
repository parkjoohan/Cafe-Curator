package com.kql.caffein.entity.Comment;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Size;

@Entity
@Getter @Setter
@NoArgsConstructor
@DynamicInsert //insert시 null값 제외
public class Comment {

    @Id
    private int commentNo;
    @Column
    private int feedNo;
    @Column
    private int commentGroup;
    @Column
    private int sequence;
    @Column
    private Integer parentNo;
    @Column
    private String userNo;
    @Size(max = 500)
    private String content;
    @Column
    private String regTime;
    @Column
    private int likeCount;
    @Column
    private int commentCount;

    @Builder
    public Comment(int feedNo, String userNo, int commentGroup, int sequence, Integer parentNo, String content) {
        this.feedNo = feedNo;
        this.userNo = userNo;
        this.commentGroup = commentGroup;
        this.sequence = sequence;
        this.parentNo = parentNo;
        this.content = content;
    }
}
