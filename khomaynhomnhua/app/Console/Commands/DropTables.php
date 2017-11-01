<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

/**
 * Xoa all tables in pharma db bang command
 */
class DropTables extends Command {

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'droptables';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete all tables in current db';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct() {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle() {
        if (!$this->confirm('CONFIRM DROP AL TABLES IN THE CURRENT DATABASE? [y|N]')) {
            exit('Drop Tables command aborted');
        }

        $colname = 'Tables_in_' . env('DB_DATABASE');
        
        $view = "view_materials_symmetricals_tables";
        
        DB::beginTransaction();
            DB::statement('SET FOREIGN_KEY_CHECKS = 0');
             // Dropview
            DB::statement("DROP VIEW IF EXISTS $view");
            
            // End dropview
        DB::commit();
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
        
        $tables = DB::select('SHOW TABLES');
        if ($tables) {
            foreach ($tables as $table) {
                //$droplist[] = $table[$colname];
                $droplist[] = $table->$colname;
            }
            $droplist = implode(',', $droplist);

            DB::beginTransaction();
            
            // Khong check FOREIGN truoc khi xoa
            DB::statement('SET FOREIGN_KEY_CHECKS = 0');
           
            DB::statement("DROP TABLE $droplist");
            //turn referential integrity back on
            //DB::statement('SET FOREIGN_KEY_CHECKS = 1');
            DB::commit();
        }
        $this->comment(PHP_EOL . "If no errors showed up, all tables were dropped" . PHP_EOL);
    }

}
