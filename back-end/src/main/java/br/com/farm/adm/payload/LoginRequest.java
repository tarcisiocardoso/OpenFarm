package br.com.farm.adm.payload;

// import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

/**
 * Created by rajeevkumarsingh on 02/08/17.
 */
public class LoginRequest {
    @NotBlank
    public String login;

    @NotBlank
    public String password;

}
