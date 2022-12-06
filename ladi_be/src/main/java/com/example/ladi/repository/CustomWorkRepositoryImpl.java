package com.example.ladi.repository;

import com.example.ladi.model.*;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.lang.annotation.Annotation;
import java.util.List;

@Repository
public class CustomWorkRepositoryImpl implements CustomWorkRepository{
    @Autowired
    EntityManager entityManager;



    @Override
    public String value() {
        return null;
    }

    @Override
    public Class<? extends Annotation> annotationType() {
        return null;
    }

    @Override
    public List finWorkByConditions(String startDate, String endDate, Account account, String shopCode, int isActive) {
        JPAQuery<Work> workQuery = new JPAQuery<>(entityManager);
        QWork qWork = QWork.work;
        BooleanBuilder filter = new BooleanBuilder();
        if (shopCode != null){
            String[] shopCodeArr = shopCode.split(",");
            for (String item : shopCodeArr){
                filter.and(qWork.account.shop.like("%"+item+"%"));
            }
        }
        if (isActive != 0){
            filter.and(qWork.isActive.eq(isActive));
        }
        if (startDate != null && endDate != null){
            filter.and(qWork.timeIn.loe(Long.parseLong(endDate)));
            filter.and(qWork.timeIn.goe(Long.parseLong(startDate)));
        }
        if (account != null) {
            filter.and(qWork.account.eq(account));
        }
        List<Work> workList = workQuery.from(qWork).where(filter).orderBy(qWork.id.desc()).fetch();
        return workList;
    }
}
