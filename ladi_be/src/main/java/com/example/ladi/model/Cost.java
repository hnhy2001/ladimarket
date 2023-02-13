package com.example.ladi.model;

import com.example.ladi.dto.SoDonTheoThoiGianDto;
import lombok.*;

import javax.persistence.*;

@NamedNativeQuery(name = "Cost.laySoDonTheoThoiGian",
        query = "SELECT COUNT(id) as count from `data` WHERE date_only <= :endDate AND date_only >= :startDate GROUP BY date_only",
        resultSetMapping = "Mapping.soDonTheoThoiGianDto")
@SqlResultSetMapping(name = "Mapping.soDonTheoThoiGianDto", classes = @ConstructorResult(targetClass = SoDonTheoThoiGianDto.class,
        columns = {@ColumnResult(name = "count", type = Integer.class)}))
@Entity(name = "cost")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Cost extends BaseEntity{
    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "status")
    private int status;

    @Column(name = "cost_per_day")
    private Double costPerDay;

    @Column(name = "num_of_day")
    private int numOfDay;

    @Column(name = "total_cost")
    private int totalCost;

    @Column(name = "from_date")
    private Long fromDate;

    @Column(name = "to_date")
    private Long toDate;

    @Column(name = "num_of_order")
    private int numOfOrder;

    @ManyToOne
    @JoinColumn(name = "type_id")
    CostType costType;

}
