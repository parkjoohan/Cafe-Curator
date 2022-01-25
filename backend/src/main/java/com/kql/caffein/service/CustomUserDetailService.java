package com.kql.caffein.service;

import com.kql.caffein.entity.User.User;
import com.kql.caffein.entity.User.UserDetail;
import com.kql.caffein.repository.UserDetailRepository;
import com.kql.caffein.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Component("userDetailsService")
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    private final UserRepository userRepository;
    private final UserDetailRepository userDetailRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String email) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()){
            UserDetail userDetail = userDetailRepository.findByUserNo(user.get().getUserNo());
            return org.springframework.security.core.userdetails.User.builder()
                    .username(user.get().getEmail())
                    .password(userDetail.getPass())
                    .roles(user.get().getRole().getKey())
                    .build();
        } else{
            throw new UsernameNotFoundException("존재하지 않는 이메일입니다.");
        }
    }
}
