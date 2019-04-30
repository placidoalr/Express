import {Post} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import {VPUtils} from '../utils/vputils';
import {KernelUtils} from '../kernel/kernel-utils';
import { MySQLFactory } from '../mysql/mysql_factory';

export class AddSaborAction extends Action{

    private validateData(){
        new KernelUtils().createExceptionApiError('1001', 'Informe o tamanho', this.req.body.tamanho == '' || this.req.body.tamanho == undefined);
        new KernelUtils().createExceptionApiError('1001', 'Não esqueça o nome e preço', this.req.body.sabor == '' || this.req.body.preco == '');
    }

    private generateSQL() : string {
        console.log(this.req.body);
        return 'select * from sabor where sabor.tamanho =\'' + this.req.body.tamanho + '\' and  sabor.sabor = \''+this.req.body.sabor+'\';';
    }
    private insertUserSQL() : string{
        return 'insert into sabor (sabor.tamanho, sabor.sabor, sabor.preco) values (\''+ this.req.body.tamanho +'\', \''+ this.req.body.sabor+'\', \''+this.req.body.preco+'\');';
    }

    @Post('/addSabor')
    public Post(){
        this.validateData();

        new MySQLFactory().getConnection().select(this.generateSQL()).subscribe(
            (data : any) => {
                if (data.length || data.length > 0){
                    console.log(data);
                  this.sendError(new KernelUtils().createErrorApiObject(401, '1001', 'Sabor já existe!!!'));
                  return;
                }else{
                    console.log(data);
                    new MySQLFactory().getConnection().select(this.insertUserSQL()).subscribe(
                        (data : any) => {
                            console.log(data);
                        }
                    );
                }
                this.sendAnswer({
                    token    : new VPUtils().generateGUID().toUpperCase()
                });
            },
            (error : any) => {
                this.sendError(error);
            }
        );
    }

    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
    }
}