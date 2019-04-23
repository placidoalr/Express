import {Post} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import {VPUtils} from '../utils/vputils';
import {KernelUtils} from '../kernel/kernel-utils';
import { MySQLFactory } from '../mysql/mysql_factory';

export class AddUserAction extends Action{

    private validateData(){
        new KernelUtils().createExceptionApiError('1001', 'Informe usuário e senha', this.req.body.userName == '' || this.req.body.password == '');
    }

    private generateSQL() : string {
        return 'select * from usuario where usuario.nome = \'' + this.req.body.userName + '\'';
    }

    @Post('/addUser')
    public Post(){
        this.validateData();

        new MySQLFactory().getConnection().select(this.generateSQL()).subscribe(
            (data : any) => {
                if (data.length || data.length > 0){
                  this.sendError(new KernelUtils().createErrorApiObject(401, '1001', 'Usuário já existe'));
                  return;
                }
                
                this.sendAnswer({
                    token    : new VPUtils().generateGUID().toUpperCase(),
                    userName : this.req.body.userName,
                    password : this.req.body.password
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