package com.campusfix.backend.controller;
import com.campusfix.backend.model.Complaint;
import com.campusfix.backend.service.ComplaintService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins="*")
public class ComplaintController {
    private final ComplaintService service;
    public ComplaintController(ComplaintService service){this.service=service;}
    @PostMapping public Complaint create(@Valid @RequestBody Complaint c){return service.create(c);}
    @GetMapping public List<Complaint> all(){return service.all();}
    @PutMapping("/{id}/status") public ResponseEntity<Complaint> status(@PathVariable Long id,@RequestParam String value){
        try{return ResponseEntity.ok(service.updateStatus(id,value));}catch(Exception e){return ResponseEntity.notFound().build();}
    }
    @GetMapping("/health") public String health(){return "CampusFix Backend is Running!";}
}
