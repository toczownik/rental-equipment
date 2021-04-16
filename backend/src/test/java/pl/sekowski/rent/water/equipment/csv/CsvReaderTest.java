package pl.sekowski.rent.water.equipment.csv;

import org.junit.jupiter.api.Test;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

class CsvReaderTest {

    final String path = "E:\\polibuda6sem\\projectZAI_ORO\\src\\main\\resources\\csv.data\\users.csv";


    @Test
    public void readUserFromFile() throws IOException {
        CsvReader.readUser(path);
    }

}