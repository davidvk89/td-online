<?php

class CharacterHandler extends Connection{  
    
    function __construct($account_id){
        parent:: __construct();
        
    }

    function create_empty_slot(){
        $slot = ["character_id"=>0];
        
        return $slot;
    }

    function create_empty_slots_template(){
        $template = [
            "slot_1" => $this->create_empty_slot(),
            "slot_2" => $this->create_empty_slot(),
            "slot_3" => $this->create_empty_slot()
        ];

        return $template;
    }

    function send_game_file_no_characters_found(){
        echo json_encode($this->create_empty_slots_template());
    }

    function send_game_file_character_slots($db_characters){
        $slot_1 =$this->create_empty_slot();
        $slot_2 = $this->create_empty_slot();
        $slot_3 = $this->create_empty_slot();

        while($row = $db_characters->fetch_array(MYSQLI_ASSOC)){
            $character = [
                "character_id" => $row['character_id'],
                "account_id" => $row['account_id'],
                "slot_id"=> $row['slot_id'],
                "name" => $row['name'],
                "textureKey" => $row['texture_key'],
                "location" => $row['location']
            ];
            
            $slot_id = $row['slot_id'];

            switch($slot_id){
                case 1;
                $slot_1 = $character;
                break;
                case 2;
                $slot_2 = $character;
                break;
                case 3;
                $slot_3 = $character;
            }
        } 

        $game_file_character_slots = [
            "slot_1"=> $slot_1,
            "slot_2"=> $slot_2,
            "slot_3"=> $slot_3
        ];
        

        echo json_encode($game_file_character_slots);
    }

    
    

    function return_game_file_character_slots($account_id){
     
        $stmt = $this->connection->prepare("SELECT * FROM player_characters WHERE account_id = ? ");
        $stmt -> bind_param('i', $account_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
       
        if($result->num_rows == 0){ 
           $this->send_game_file_no_characters_found();
        } else {
            $this->send_game_file_character_slots($result);           
       }
          
    }
            
}
                
            
    
       
  




?>