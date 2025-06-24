package com.shruti.jobtracker.model;

import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String jobTitle;
    private String companyName;
    @NotNull
    private LocalDate appliedDate;
    private String status;
    private String resumeLink;
}

