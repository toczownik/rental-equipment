package pl.sekowski.rent.water.equipment.csv;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import pl.sekowski.rent.water.equipment.appuser.User;
import pl.sekowski.rent.water.equipment.item.Item;
import pl.sekowski.rent.water.equipment.item.Unit;

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

public class CsvReader {

    private final static String[] USER_HEADERS = {"name", "surname", "mail", "password"};

    public static List<User> readUser(String path) throws IOException {
        Reader in = new FileReader(path);
        Iterable<CSVRecord> records = CSVFormat.DEFAULT
                .withHeader(USER_HEADERS)
                .withFirstRecordAsHeader()
                .parse(in);
        List<User> list = new ArrayList<>();
        for (CSVRecord record : records) {
            String name = record.get(USER_HEADERS[0]);
            String surname = record.get(USER_HEADERS[1]);
            String mail = record.get(USER_HEADERS[2]);
            String password = record.get(USER_HEADERS[3]);
            list.add(new User(name, surname, mail, password));
        }
        return list;
    }

    private final static String[] ITEM_HEADERS = {"name", "description", "pricePerUnit", "unit", "available"};

    public static List<Item> readItem(String path) throws IOException {
        Reader in = new FileReader(path);
        Iterable<CSVRecord> records = CSVFormat.DEFAULT
                .withHeader(USER_HEADERS)
                .withFirstRecordAsHeader()
                .parse(in);
        List<Item> list = new ArrayList<>();
        for (CSVRecord record : records) {
            String name = record.get(ITEM_HEADERS[0]);
            String description = record.get(ITEM_HEADERS[1]);
            String pricePerUnit = record.get(ITEM_HEADERS[2]);
            String unit = record.get(ITEM_HEADERS[3]);
            String available = record.get(ITEM_HEADERS[4]);
            Unit u = Unit.DAY;
            if ( unit.equals("DAY") )
                u = Unit.DAY;
            list.add(new Item(name, description, Double.valueOf(pricePerUnit), u, Boolean.valueOf(available)));
        }
        return list;
    }
}
