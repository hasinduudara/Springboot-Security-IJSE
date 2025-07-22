package lk.ijse.gdse.backend.dto;

import lombok.Data;

@Data
public class RegisterDTO {
    private String username;
    private String password;
    private String role; //USER or ADMIN
}
