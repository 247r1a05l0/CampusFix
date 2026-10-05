package com.campusfix.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Complaint {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank private String studentName;
    @NotBlank private String email;
    @NotBlank private String category;
    @NotBlank private String title;
    @NotBlank private String description;
    private String location;
    private String status = "OPEN";
    private String priority = "MEDIUM";

    public Complaint() {}
    public Long getId(){return id;}
    public String getStudentName(){return studentName;}
    public void setStudentName(String v){studentName=v;}
    public String getEmail(){return email;}
    public void setEmail(String v){email=v;}
    public String getCategory(){return category;}
    public void setCategory(String v){category=v;}
    public String getTitle(){return title;}
    public void setTitle(String v){title=v;}
    public String getDescription(){return description;}
    public void setDescription(String v){description=v;}
    public String getLocation(){return location;}
    public void setLocation(String v){location=v;}
    public String getStatus(){return status;}
    public void setStatus(String v){status=v;}
    public String getPriority(){return priority;}
    public void setPriority(String v){priority=v;}
}
